const { exec } = require('child_process');

const command = `protoc --go_out=out_protos --go_opt=paths=source_relative --go-grpc_out=out_protos --go-grpc_opt=paths=source_relative protos/*.proto`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(error);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});