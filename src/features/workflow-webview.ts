import * as vscode from "vscode";

export function createWorkflowWebview(
  context: vscode.ExtensionContext,
  {
    fileName,
    webviews,
  }: { fileName: string; webviews: Map<string, vscode.WebviewPanel> }
) {
  const workflowWebviewPanel = vscode.window.createWebviewPanel(
    "workflow-generator.workflowWebview",
    fileName,
    { viewColumn: vscode.ViewColumn.One },
    {
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "assets")],
    }
  );

  const fileIconPathUri = vscode.Uri.file(context.extensionPath);
  const fileIconPath = vscode.Uri.joinPath(
    fileIconPathUri,
    "assets",
    "icons",
    "yml.svg"
  );

  workflowWebviewPanel.iconPath = fileIconPath;

  workflowWebviewPanel.onDidDispose(
    () => {
      // provide cleanups for webview
      webviews.delete(fileName);
    },
    null,
    context.subscriptions
  );

  webviews.set(fileName, workflowWebviewPanel);
}
