import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: 'userId', headerName: 'User ID', width: 30, flex:0.2,  editable: false},
  { field: 'id', headerName: 'ID', width: 30, flex: 0.2, editable: false},
  { field: 'title', headerName: 'Title', width: 90, flex: 0.5, editable: false },
  { field: 'body', headerName: 'Body', width: 90, flex: 1, editable: false },
];

const Table = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        const formattedPosts: Post[] = data.map((post: any) => ({
          userId: post.userId,
          id: post.id,
          title: post.title,
          body: post.body,
        }));
        setPosts(formattedPosts);
      });
  }, []);
  console.log(posts)
  
  return (
<>
<h1 className="text-2xl font-bold text-center mt-10 mb-3">Data Table</h1>
<Box sx={{ height: '76vh', width: '100%' }}>
      <DataGrid
      rows={posts}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 8,
          },
        },
      }}
      pageSizeOptions={[5]}
     
        disableRowSelectionOnClick
      />
    </Box>

    </>
  );
};

export default Table;


