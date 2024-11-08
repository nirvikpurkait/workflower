import * as vscode from "vscode";
import { workflowGenerator_refreshWorkflowList } from "../command-list";
import { WorkflowFileTreeProvider } from "../features/workflow-tree";

export function refreshWorkflowList(
  context: vscode.ExtensionContext,
  ymlFileTreeProvider: WorkflowFileTreeProvider
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      workflowGenerator_refreshWorkflowList,
      () => {
        ymlFileTreeProvider.refresh();
      }
    )
  );
}
