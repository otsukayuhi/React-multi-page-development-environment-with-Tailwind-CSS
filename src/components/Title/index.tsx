import React from 'react';
import './styles.pcss';

type Props = {
  text: string;
};

export const Title: React.FC<Props> = ({ text }) => (
  <h1 className="title">
    <span>{text}</span>
  </h1>
);
