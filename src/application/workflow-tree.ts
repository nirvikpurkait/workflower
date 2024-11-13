import * as vscode from "vscode";
import { WorkflowFileTreeProvider } from "../features/workflow-tree";
import { refreshWorkflowList } from "../commands/refresh-workflow-tree";
import { createNewWorkflow } from "../commands/create-new-workflow";
import path from "node:path";
import fs from "node:fs";
import { openWorkflowInEditor } from "../commands/open-workflow-in-editor";

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

  const workflowFolderPath = path.join(rootPath, ".github/workflows");

  // if user does not have workflow folder return
  if (!pathExists(workflowFolderPath)) {
    return;
  }

  /**
   * create new workflow tree provider
   */
  const workflowTreeProvider = new WorkflowFileTreeProvider(workflowFolderPath);

  vscode.window.registerTreeDataProvider(
    "workflow-generator.workflow-list",
    workflowTreeProvider
  );

  const webviews: Map<string, vscode.WebviewPanel> = new Map();

  /**
   * register different command for workflow tree
   */
  refreshWorkflowList(context, workflowTreeProvider);
  createNewWorkflow(context);
  openWorkflowInEditor(context, { webviews });
}

function pathExists(p: string): boolean {
  try {
    fs.accessSync(p);
  } catch {
    return false;
  }

  return true;
}
