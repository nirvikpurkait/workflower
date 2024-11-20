import * as vscode from "vscode";
import { workflower_refreshWorkflowList } from "../command-list";
import { WorkflowFileTreeProvider } from "../features/workflow-tree";

export function refreshWorkflowList(
  context: vscode.ExtensionContext,
  workflowFilesTreeProvider: WorkflowFileTreeProvider
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(workflower_refreshWorkflowList, () => {
      workflowFilesTreeProvider.refresh();
    })
  );
}
