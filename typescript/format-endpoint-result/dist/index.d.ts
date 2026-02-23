import type * as wit from "../generated/types/wit.d.ts";
declare function formatEndpointResultImpl(headers: string, // headers: json-string
body: string | undefined, // body: option<string>
bodyParameters: string, // body-parameters: json-string
statusCode: number): wit.formatEndpointResult.Output;
export declare const formatEndpointResult: {
    formatEndpointResult: typeof formatEndpointResultImpl;
};
export {};
