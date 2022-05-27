import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'

import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from "../../interfaces";
import { dateFunctions } from '../../utils';
const validStatus: EntryStatus[] = ['pending', 'in-progress','finished'];

interface Props {
    entry: Entry
}


export const EntryPage:FC<Props> = ({ entry }) => {

    const { updateEntry } = useContext( EntriesContext );

    // const onSave = () => {
    //     if ( inputValue.trim().length === 0 ) return;

    //     const updatedEntry: Entry = {
    //         ...entry,
    //         status,
    //         description: inputValue
    //     }

    //     updateEntry( updatedEntry, true );
    // }


  return (

    <Layout title="Editing Entry">
        <button 
            className='w-20 h-6 bg-red-400 flex items-center justify-center rounded-md'>
            { entry.status }
        </button>
    </Layout>

  );
};



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { id } = params as { id: string };
    
    const entry = await dbEntries.getEntryById( id );


    if ( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }


    return {
        props: {
            entry
        }
    }
}





export default EntryPage;