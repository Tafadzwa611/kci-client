import React, { Fragment } from 'react';

export default function CombinatorSelector({className, handleOnChange, options, title, value}) {
  const combinatorLabels = {'AND': 'Match All', 'OR': 'Match Any'};

  return (
    <form className={className} title={title}>
      {options.map(option => {
        const key = option.id ? `key-${option.id}` : `key-${option.name}`;
        return (
          <Fragment key={key}>
            <label>
              <input type='radio' name='combinatorSelector'
                checked={value === option.name} onChange={() => handleOnChange(option.name)} />{' '}
                {combinatorLabels[option.label]}
            </label>{' '}
          </Fragment>
        )
      })}
    </form>
  )
}
