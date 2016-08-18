/*
 * react-redux-fetch knows how to handle the following services:
 *     - requestMethods
 *     - requestHeaders
 *     - reducers
 *     - responseHandler (TODO)
 *     - requestBuilder
 */

import ContainerBuilder from './dependencyInjection/ContainerBuilder';
import fetchRequest from './middleware/fetchRequest';
import getReducer from './reducers/getReducer';
import deleteReducer from './reducers/deleteReducer';
import postReducer from './reducers/postReducer';
import putReducer from './reducers/putReducer';
import requestHeaders from './utils/defaultHeaders';
import requestBuilder from './utils/requestBuilder';

const container = new ContainerBuilder();

function bootstrap() {

    container.register('requestMethods', {
        'get': {
            method: 'get',
            actionPrefix: 'fetch',
            middleware: fetchRequest,
            reducer: getReducer
        },
        'post': {
            method: 'post',
            actionPrefix: 'create',
            middleware: fetchRequest,
            reducer: postReducer
        },
        'put': {
            method: 'put',
            actionPrefix: 'update',
            middleware: fetchRequest,
            reducer: putReducer
        },
        'delete': {
            method: 'delete',
            actionPrefix: 'remove',
            middleware: fetchRequest,
            reducer: deleteReducer
        }
    });

    container.register('requestHeaders', requestHeaders);
    container.register('requestBuilder', {build:requestBuilder});
    // container.getDefinition('requestMethods').addArgument('patch', '...');
    // container.getDefinition('requestMethods').addArgument('token', '...');

    return container;
}

export default bootstrap();