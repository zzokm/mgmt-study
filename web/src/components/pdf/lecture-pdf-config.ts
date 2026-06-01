import type { PluginRegistry } from "@embedpdf/react-pdf-viewer";

/** Study viewer: no form fill, redaction, insert, or shape tools. */
export const LECTURE_VIEWER_DISABLED_CATEGORIES: string[] = [
  "form",
  "redaction",
  "insert",
  "mode-form",
  "mode-redact",
  "mode-insert",
  "mode-shapes",
  "shape",
  "annotation-shape",
];

type UiCapability = {
  getSchema: () => {
    toolbars: Record<string, { items: unknown[] }>;
    menus: Record<string, { items: Array<{ id?: string; commandId?: string }> }>;
  };
  mergeSchema: (partial: {
    toolbars?: Record<string, { items: unknown[] }>;
    menus?: Record<string, { items: unknown[] }>;
  }) => void;
};

type ToolbarGroup = {
  id?: string;
  items?: Record<string, unknown>[];
};

/**
 * Customize toolbar after the default schema is loaded (see EmbedPDF customizing-ui docs).
 * Do not pass a partial `ui.schema` in config — it replaces the default and breaks plugins.
 */
export function customizeLectureViewerUi(registry: PluginRegistry): void {
  const ui = (
    registry.getPlugin("ui") as { provides: () => UiCapability } | null
  )?.provides();
  if (!ui) return;

  const schema = ui.getSchema();
  const mainToolbar = schema.toolbars["main-toolbar"];
  if (mainToolbar?.items) {
    const items = structuredClone(mainToolbar.items) as ToolbarGroup[];
    const rightGroup = items.find((item) => item.id === "right-group");
    if (rightGroup?.items) {
      rightGroup.items.push({
        type: "command-button",
        id: "fullscreen-toolbar-button",
        commandId: "document:fullscreen",
        variant: "icon",
        categories: ["document", "document-fullscreen"],
      });
    }
    ui.mergeSchema({
      toolbars: { "main-toolbar": { ...mainToolbar, items } },
    });
  }

  const docMenu = schema.menus["document-menu"];
  if (docMenu?.items) {
    const items = docMenu.items.filter(
      (item) =>
        item.id !== "document:fullscreen" &&
        item.commandId !== "document:fullscreen"
    );
    ui.mergeSchema({
      menus: { "document-menu": { ...docMenu, items } },
    });
  }
}
