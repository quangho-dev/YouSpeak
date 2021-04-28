import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  List,
  Divider,
  Grid,
} from '@material-ui/core'
import DownloadItem from './DownloadItem'

const Downloader = ({ files = [], remove }) => {
  return (
    <Card
      variant="outlined"
      style={{
        width: '40em',
        minHeight: '10em',
        position: 'fixed',
        right: 0,
        bottom: 0,
        marginBottom: 0,
        paddingBottom: 0,
        zIndex: 99999,
      }}
    >
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{
          backgroundColor: 'black',
          height: '3em',
        }}
      >
        <Grid item xs={5}>
          <Typography variant="body1" style={{ color: 'white' }}>
            Download files
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <CardContent>
        <List>
          {files.map((file, idx) => (
            <DownloadItem
              key={idx}
              removeFile={() => remove(file.downloadId)}
              {...file}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default Downloader
