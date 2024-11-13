import fs from "node:fs";
import path from "node:path";
import * as vscode from "vscode";
import { workflowGenerator_openWorkflowInEditor } from "../command-list";

/**
 * create a workflow tree provider
 */
export class WorkflowFileTreeProvider
  implements vscode.TreeDataProvider<WorkflowFileTreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    WorkflowFileTreeItem | undefined | void
  > = new vscode.EventEmitter<WorkflowFileTreeItem | undefined | void>();

  readonly onDidChangeTreeData: vscode.Event<
    WorkflowFileTreeItem | undefined | void
  > = this._onDidChangeTreeData.event;

  constructor(private workflowFolderPath: string) {}

  // method to refresh the tree provider
  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(
    element: WorkflowFileTreeItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(
    element?: WorkflowFileTreeItem
  ): vscode.ProviderResult<WorkflowFileTreeItem[]> {
    const fileTree = this.workflowFiles().map((ymlFileName) => {
      // for each workflow file show the file item in view-tree
      return new WorkflowFileTreeItem(ymlFileName);
    });

    return fileTree;
  }

  // find all `.yml` files from `.github/workflows`
  private workflowFiles(): string[] {
    const workflowFilesList = fs
      .readdirSync(this.workflowFolderPath, {
        encoding: "utf-8",
      })
      .filter((file) => file.endsWith(".yml"));

    return workflowFilesList;
  }
}

class WorkflowFileTreeItem extends vscode.TreeItem {
  constructor(public readonly label: string) {
    super(label);

    this.collapsibleState = vscode.TreeItemCollapsibleState.None;
    this.iconPath = path.join(__filename, "../../../", "assets/icons/yml.svg");

    /**
     * onselect of this tree-item execute the following command
     */
    this.command = {
      command: workflowGenerator_openWorkflowInEditor,
      title: "",
      arguments: [label],
    };
  }
}
