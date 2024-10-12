import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';

import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  String = 'alphabetical',
  Number = 'length',
  Default = '',
}

export const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState<boolean>(false);
  const sortedGoods = [...goodsFromServer].sort((good1: string, good2: string) => {
    switch (sortOrder) {
      case 'alphabetical':
        return good1.localeCompare(good2);
      case 'length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortOrder !== 'alphabetical',
          })}
          onClick={() => setSortOrder(SortType.String)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortOrder !== 'length',
          })}
          onClick={() => setSortOrder(SortType.Number)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(reversed || sortOrder) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortOrder(SortType.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map((good: string) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
