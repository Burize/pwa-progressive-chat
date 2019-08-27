import * as React from 'react';

import { block } from 'shared/helpers/bem';
import { Todos as TodosFeature } from 'features/manageTodos';
import { Layout } from 'shared/view';

const b = block('todos-container');

class Todos extends React.PureComponent {
  public render() {
    return (
      <Layout>
        <div className={b()}><TodosFeature /></div>
      </Layout>
    );
  }
}

export default Todos;
