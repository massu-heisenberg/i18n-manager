在VSCode中，默认行为是打开一个文件时自动关闭当前已经打开的文件，除非你对当前文件进行了编辑或其他修改。如果你想要阻止这个默认行为，可以使用以下方法之一：

### 方法1: 使用 "workbench.editor.enablePreview" 设置

在VSCode的设置中，你可以设置 "workbench.editor.enablePreview" 选项为 `false`。这会禁用文件的预览模式，使得每次打开文件时都会打开一个新的编辑器而不是预览。

1. 打开设置（快捷键：`Ctrl` + `,` 或 `Cmd` + `,`）。
2. 在搜索框中输入 "workbench.editor.enablePreview"。
3. 将 "Workbench › Editor: Enable Preview" 设置为 `false`。

这样设置后，每次打开文件时都会在新的编辑器中打开，而不是预览模式。

### 方法2: 使用 "workbench.editor.limit.enabled" 设置

另一个方法是通过设置 "workbench.editor.limit.enabled" 为 `false`，禁用编辑器数量限制。这会防止VSCode在打开新文件时自动关闭其他文件。

1. 打开设置（快捷键：`Ctrl` + `,` 或 `Cmd` + `,`）。
2. 在搜索框中输入 "workbench.editor.limit.enabled"。
3. 将 "Workbench › Editor: Limit" 设置为 `false`。

这样设置后，VSCode将不再限制同时打开的编辑器数量。

通过以上方法之一，你可以更灵活地控制VSCode在打开新文件时是否关闭当前文件。
