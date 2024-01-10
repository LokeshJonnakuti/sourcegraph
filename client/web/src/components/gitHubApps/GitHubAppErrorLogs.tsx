import React from 'react';

interface GitHubAppErrorLogsProps {
  errorLogs: string[];
}

const GitHubAppErrorLogs: React.FunctionComponent<GitHubAppErrorLogsProps> = ({ errorLogs }) => {
  return (
    <div className="github-app-error-logs">
      {errorLogs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
};

export default GitHubAppErrorLogs;
