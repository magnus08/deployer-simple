
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
      <div className='ui unstackable items'>
        {projectComponents}
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
      <div className='item'>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleToggleAutodeploy}>
              <i className='large caret up icon' />
            </a>
            {this.props.autoDeploy}
          </div>
          <div className='description'>
            <p>
              {this.props.title}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProjectList />,
  document.getElementById('content')
);
