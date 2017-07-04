
class ProjectList extends React.Component {
    state = {
        projects: [],
    };

    componentDidMount() {
        this.loadProjectsFromServer();
        // this.setState({ projects: Seed.projects });
    };

    loadProjectsFromServer = () => {
        client.getProjects((serverProjects) => (
            this.setState({ projects: serverProjects })
        ))
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
    };

    handleProjectRedeploy = (projectId) => {
        const nextProjects = this.state.projects.map((project) => {
            if (project.id === projectId) {
                return Object.assign({}, project, {
                    redeploying: true,
                });
            } else {
                return project;
            }
        });
        this.setState({
            projects: nextProjects,
        });
        console.log(projectId + ' redeploy started');
    }

    handleProjectRebuild = (projectId) => {
        const nextProjects = this.state.projects.map((project) => {
            if (project.id === projectId) {
                return Object.assign({}, project, {
                    rebuilding: true,
                });
            } else {
                return project;
            }
        });
        this.setState({
            projects: nextProjects,
        });
        console.log(projectId + ' rebuild started');
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
                redeploying={project.redeploying}
                rebuilding={project.rebuilding}
                onToggleAutoDeploy={this.handleProjectToggleAutodeploy}
                onRedeploy={this.handleProjectRedeploy}
                onRebuild={this.handleProjectRebuild}
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
    handleRedeploy = () => (
        this.props.onRedeploy(this.props.id)
    );
    handleRebuild = () => (
        this.props.onRebuild(this.props.id)
    );

    render() {
        return (
            <tr>
                <td className='center aligned'>
                    <a onClick={this.handleToggleAutodeploy}>
                        <i className= { this.props.autoDeploy?'toggle on icon':'toggle off icon' } />
                    </a>
                </td>
                <td className='left aligned'>
                    <p>
                        {this.props.title}
                    </p>
                </td>
                <td className='center aligned'>
                    <a onClick={this.handleRedeploy}>
                        <i className= { this.props.redeploying?'hourglass half icon':'refresh icon' } />
                    </a>
                </td>
                <td className='center aligned'>
                    <a onClick={this.handleRebuild}>
                        <i className= { this.props.rebuilding?'hourglass half icon':'recycle icon' } />
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
