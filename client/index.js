var PROTO_PATH = __dirname + '/../proto/helloworld.proto';
var REQUEST_DURATION_MS = 5000 // リクエスト間隔 (ms)

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)
var helloworld_proto = grpc.loadPackageDefinition(packageDefinition).helloworld

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    var target = 'grpc-server:50051';

    var client = new helloworld_proto.Greeter(
        target,
        grpc.credentials.createInsecure(),
        {
            "grpc.keepalive_time_ms": 1000,
            "grpc.keepalive_timeout_ms": 2000,
            "grpc.http2.min_time_between_pings_ms": 3000,
            "grpc.http2.max_pings_without_data": 0,
            "grpc.keepalive_permit_without_calls": 1
        }
    );

    const callSayHello = function() {
        client.sayHello({ name: 'Apple'}, async function(err, response) {
            console.log('Response:', response.message);
            
            await sleep(REQUEST_DURATION_MS)
            callSayHello()
        })
    }

    callSayHello()
}

main();