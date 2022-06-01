import { EntriesState } from './';
import { IEntry } from '../../interfaces';


type EntriesActionType = 
   | { type: '[Entry] Entry-add', payload: IEntry  } 
   | { type: '[Entry] Entry-Updated', payload: IEntry  } 
   | { type: '[Entry] Entry-Deleted', payload: IEntry  }
   | { type: '[Entry] Entries-Loaded', payload: IEntry[]  }


export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

   switch (action.type) {
      case '[Entry] Entry-add':
         return {
            ...state,
            entries: [ ...state.entries, action.payload ]
          }

      case '[Entry] Entry-Updated':
          return {
             ...state,
             entries: state.entries.map( entry => {
               if ( entry._id === action.payload._id ) {
                  entry.status = action.payload.status;
                  entry.description = action.payload.description;
               }
               return entry;
             })
          }
      
      case '[Entry] Entries-Loaded':
         return {
            ...state,
            entries: [ ...action.payload ]
         }

       default:
          return state;
   }

}