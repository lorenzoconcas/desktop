import * as React from 'react'

import { Dispatcher } from '../dispatcher'
import { nameOf, Repository } from '../../models/repository'
import { Dialog, DialogContent, DialogFooter } from '../dialog'
import { OkCancelButtonGroup } from '../dialog/ok-cancel-button-group'
import { TextBox } from '../lib/text-box'

interface ICreateRepositoryListFolderProps {
  readonly dispatcher: Dispatcher
  readonly onDismissed: () => void
  readonly repository: Repository
}

interface ICreateRepositoryListFolderState {
  readonly name: string
}

export class CreateRepositoryListFolder extends React.Component<
  ICreateRepositoryListFolderProps,
  ICreateRepositoryListFolderState
> {
  public constructor(props: ICreateRepositoryListFolderProps) {
    super(props)

    this.state = { name: '' }
  }

  public render() {
    return (
      <Dialog
        id="create-repository-list-folder"
        title={
          __DARWIN__ ? 'Create Repository Folder' : 'Create repository folder'
        }
        ariaDescribedBy="create-repository-list-folder-description"
        onDismissed={this.props.onDismissed}
        onSubmit={this.createFolder}
      >
        <DialogContent>
          <p id="create-repository-list-folder-description">
            Create a virtual folder for "{nameOf(this.props.repository)}".
          </p>
          <p>
            <TextBox
              ariaLabel="Folder name"
              value={this.state.name}
              autoFocus={true}
              onValueChanged={this.onNameChanged}
            />
          </p>
          <p className="description">
            This only changes how repositories are grouped in GitHub Desktop.
          </p>
        </DialogContent>

        <DialogFooter>
          <OkCancelButtonGroup
            okButtonText={__DARWIN__ ? 'Create Folder' : 'Create folder'}
            okButtonDisabled={this.state.name.trim().length === 0}
          />
        </DialogFooter>
      </Dialog>
    )
  }

  private onNameChanged = (name: string) => {
    this.setState({ name })
  }

  private createFolder = () => {
    this.props.dispatcher.createRepositoryListFolder(
      this.state.name,
      this.props.repository
    )
    this.props.onDismissed()
  }
}
