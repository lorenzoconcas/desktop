import * as React from 'react'
import classNames from 'classnames'

import { Repository } from '../models/repository'
import { iconForRepository, Octicon } from './octicons'
import * as octicons from './octicons/octicons.generated'

interface IRepositoryTabsProps {
  readonly repositories: ReadonlyArray<Repository>
  readonly selectedRepository: Repository | null
  readonly onTabClicked: (repository: Repository) => void
  readonly onTabClosed: (repository: Repository) => void
}

export class RepositoryTabs extends React.PureComponent<IRepositoryTabsProps> {
  public render() {
    if (this.props.repositories.length === 0) {
      return null
    }

    return (
      <div
        id="open-repository-tabs"
        className="repository-tabs"
        role="tablist"
        aria-label="Open repositories"
      >
        {this.props.repositories.map(this.renderTab)}
      </div>
    )
  }

  private renderTab = (repository: Repository) => {
    const selected = this.props.selectedRepository?.id === repository.id
    const title = repository.alias ?? repository.name
    const className = classNames('repository-tab', { selected })

    return (
      <div className={className} key={repository.id}>
        <button
          className="repository-tab-button"
          onClick={this.onTabClicked(repository)}
          role="tab"
          aria-selected={selected}
          aria-label={title}
          tabIndex={selected ? undefined : -1}
          type="button"
        >
          <Octicon
            symbol={iconForRepository(repository)}
            className="repository-tab-icon"
          />
          <span className="repository-tab-title">{title}</span>
        </button>
        <button
          className="repository-tab-close"
          aria-label={`Close ${title} tab`}
          onClick={this.onTabClosed(repository)}
          type="button"
        >
          <Octicon symbol={octicons.x} />
        </button>
      </div>
    )
  }

  private onTabClicked = (repository: Repository) => () => {
    this.props.onTabClicked(repository)
  }

  private onTabClosed =
    (repository: Repository) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      this.props.onTabClosed(repository)
    }
}
