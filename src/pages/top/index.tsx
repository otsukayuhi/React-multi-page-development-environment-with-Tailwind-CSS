import React from 'react';
import { render } from 'react-dom';
import { App } from 'components/App';
import { Title } from 'components/Title';

const Page: React.FC = () => (
  <App>
    <div className="mt-16">
      <Title text="Hello World." />
      <p className="block text-center text-base">
        React multi-page development environment with Tailwind CSS.
      </p>
    </div>
  </App>
);

const rootElement = document.getElementById('root');
render(<Page />, rootElement);
