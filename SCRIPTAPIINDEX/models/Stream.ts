/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Disposition } from './Disposition';

export type Stream = {
    index?: number;
    codec_name?: string;
    codec_long_name?: string;
    profile?: string;
    codec_type?: Stream.codec_type;
    codec_time_base?: string;
    codec_tag_string?: string;
    codec_tag?: string;
    width?: number;
    height?: number;
    coded_width?: number;
    coded_height?: number;
    has_b_frames?: number;
    sample_aspect_ratio?: string;
    display_aspect_ratio?: string;
    pix_fmt?: string;
    level?: number;
    color_range?: string;
    color_space?: string;
    color_transfer?: string;
    color_primaries?: string;
    chroma_location?: string;
    field_order?: string;
    timecode?: string;
    refs?: number;
    is_avc?: boolean;
    nal_length_size?: number;
    id?: string;
    r_frame_rate?: string;
    avg_frame_rate?: string;
    time_base?: string;
    start_pts?: number;
    start_time?: number;
    duration_ts?: number;
    duration?: number;
    bit_rate?: number;
    max_bit_rate?: number;
    bits_per_raw_sample?: string;
    nb_frames?: number;
    nb_read_frames?: string;
    nb_read_packets?: string;
    tags?: any;
    disposition?: Disposition;
};

export namespace Stream {

    export enum codec_type {
        VIDEO = 'video',
        AUDIO = 'audio',
    }


}
