import * as vscode from "vscode";
import { WorkflowFileTreeProvider } from "../features/workflow-tree";
import { refreshWorkflowList } from "../commands/refresh-workflow-tree";

export function workflowTreeApplication(context: vscode.ExtensionContext) {
  const rootPath =
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : undefined;

  /**
   * if rootPath is falsy show welcome UI,
   * generated from `contributes.viewsWelcome` from `package.json`
   */
  if (!rootPath) {
    return;
  }

  /**
   * create new workflow tree provider
   */
  const workflowTreeProvider = new WorkflowFileTreeProvider(rootPath);

  vscode.window.registerTreeDataProvider(
    "workflow-generator.workflow-list",
    workflowTreeProvider
  );

  /**
   * refresh the workflow tree provider to sync
   */
  refreshWorkflowList(context, workflowTreeProvider);
}
