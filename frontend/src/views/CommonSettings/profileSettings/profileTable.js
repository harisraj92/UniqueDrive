import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';

const ProfileTable = ({ profiles, onEdit, onDelete }) => {
    const columns = [
        {
            name: 'Profile Type',
            selector: row => row.ProfileType,
            sortable: true,
        },
        {
            name: 'Profile Name',
            selector: row => row.ProfileName,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <Button variant="info" size="sm" className='mx-sm-1' onClick={() => onEdit(row)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    {' '}
                    <Button variant="danger" size="sm" className='mx-sm-1' onClick={() => onDelete(row.ProfileId)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={profiles}
            pagination
            defaultSortField="ProfileType"
            highlightOnHover
            striped
        />
    );
};

export default ProfileTable;
