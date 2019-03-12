import React, { Component } from 'react';

export interface SimpleImageProps {
    mode?: 'fill' | 'fit';
    src?: string;
    height?: number;
    width?: number;
    style?: React.CSSProperties;
}

export interface SimpleImageState {
}

export default class SimpleImage extends Component<SimpleImageProps, SimpleImageState> {
    static defaultProps: SimpleImageProps;

    constructor(props: SimpleImageProps) {
        super(props)
    }

    public render() {
        const { mode, src, height, width, style, ...props } = this.props
        const modes = {
            'fill': 'cover',
            'fit': 'contain'
        };
        const size = modes[mode || 'fit'];

        console.log(JSON.stringify(props))

        const important = {
            backgroundImage: `url('${src}')`,
            backgroundSize: size,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            width: width,
            height: height,
        };

        return <div {...props} style={{ ...style, ...important }} />
    }
}

SimpleImage.defaultProps = {
    height: 60,
    width: 60,
    mode: 'fit',
};