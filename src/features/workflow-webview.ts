import * as vscode from "vscode";

export function createWorkflowWebview(
  context: vscode.ExtensionContext,
  {
    fileName,
    openedWorkflowWebviews,
  }: {
    fileName: string;
    openedWorkflowWebviews: Map<string, vscode.WebviewPanel>;
  }
) {
  const workflowWebviewPanel = vscode.window.createWebviewPanel(
    "workflower.workflowWebview",
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
    /**
     * provide clean ups for webview
     */
    () => {
      // remove opened workflow webview data from `openedWorkflowWebviews`
      openedWorkflowWebviews.delete(fileName);
    },
    null,
    context.subscriptions
  );

  openedWorkflowWebviews.set(fileName, workflowWebviewPanel);
}
