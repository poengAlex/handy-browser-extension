/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export enum TaskStatus {
    /**
     * ERROR
     */
    ERROR = 'ERROR',
    /**
     * INIT
     */
    INIT = 'INIT',
    /**
     * REGISTERED
     */
    REGISTERED = 'REGISTERED',
    /**
     * PENDING_SOURCE
     */
    PENDING_SOURCE = 'PENDING_SOURCE',
    /**
     * PENDING_ENCODING_SOURCE
     */
    PENDING_ENCODING_SOURCE = 'PENDING_ENCODING_SOURCE',
    /**
     * PENDING_ENCODING_FLATCONV
     */
    PENDING_ENCODING_FLATCONV = 'PENDING_ENCODING_FLATCONV',
    /**
     * PENDING_ENCODING_THUMBS
     */
    PENDING_ENCODING_THUMBS = 'PENDING_ENCODING_THUMBS',
    /**
     * PENDING_ENCODING_GIF
     */
    PENDING_ENCODING_GIF = 'PENDING_ENCODING_GIF',
    /**
     * PENDING_ENCODING_SCRIPTCONV
     */
    PENDING_ENCODING_SCRIPTCONV = 'PENDING_ENCODING_SCRIPTCONV',
    /**
     * PENDING_VALIDATION
     */
    PENDING_VALIDATION = 'PENDING_VALIDATION',
    /**
     * UNASSIGNED
     */
    UNASSIGNED = 'UNASSIGNED',
    /**
     * ASSIGNED
     */
    ASSIGNED = 'ASSIGNED',
    /**
     * PENDING_SCRIPTING
     */
    PENDING_SCRIPTING = 'PENDING_SCRIPTING',
    /**
     * PENDING_QA
     */
    PENDING_QA = 'PENDING_QA',
    /**
     * QA
     */
    QA = 'QA',
    /**
     * PENDING_PUBLISH
     */
    PENDING_PUBLISH = 'PENDING_PUBLISH',
    /**
     * DONE
     */
    DONE = 'DONE',
}
