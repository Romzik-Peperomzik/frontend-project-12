import React from 'react';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
  none: () => { <div>null</div>; },
};

export default (modalName) => modals[modalName];
