
class ProjectList extends React.Component {
  state = {
    projects: [],
  };


  componentDidMount() {
    this.setState({ projects: Seed.projects });
  }

  handleProjectToggleAutodeploy = (projectId) => {
    const nextProjects = this.state.projects.map((project) => {
      if (project.id === projectId) {
        return Object.assign({}, project, {
          autoDeploy: !project.autoDeploy,
        });
      } else {
        return project;
      }
    });
    this.setState({
      projects: nextProjects,
    });
    console.log(projectId + ' was toggled, new state = ', nextProjects);
  }

  render() {
    const projects = this.state.projects.sort((a, b) => (
      a.id - b.id
    ));
    const projectComponents = projects.map((project) => (
      <Project
        key={'project-' + project.id}
        id={project.id}
        title={project.title}
        path={project.path}
        autoDeploy={project.autoDeploy}
        onToggleAutoDeploy={this.handleProjectToggleAutodeploy}
      />
    ));
    return (
      <div className='ui one column relaxed grid'>
        <div className="column">
          <table className="ui blue right aligned table">
            <thead>
              <tr>
                <th className="center aligned">Auto</th>
                <th className="left aligned">Project</th>
                <th className="center aligned">Redeploy</th>
                <th className="center aligned">Maven</th>
              </tr>
            </thead>
            <tbody>
              {projectComponents}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class Project extends React.Component {
  handleToggleAutodeploy = () => (
    this.props.onToggleAutoDeploy(this.props.id)
  );

  render() {
    return (
      <tr>
        <td className='center aligned'>
          <a onClick={this.handleToggleAutodeploy}>
            <i className= { this.props.autoDeploy?'toggle on icon':'toggle off icon' }
            />
          </a>
        </td>
        <td className='left aligned'>
          <p>
            {this.props.title}
          </p>
        </td>
        <td className='center aligned'>
          <a onClick={this.handleToggleAutodeploy}>
            <i className='refresh icon'/>
          </a>
        </td>
        <td className='center aligned'>
          <a onClick={this.handleToggleAutodeploy}>
            <i className='recycle icon'/>
          </a>
        </td>
      </tr>
    );
  }
}

ReactDOM.render(
  <ProjectList />,
  document.getElementById('content')
);
