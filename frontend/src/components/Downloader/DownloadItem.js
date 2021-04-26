import React, { useState, useEffect } from 'react'
import { ListItem, Grid, Typography } from '@material-ui/core'
import axios from 'axios'
import LinearProgressWithLabel from '../ui/LinearProgressWithLabel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const DownloadItem = ({ documentName, fileDocument, removeFile }) => {
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  })

  useEffect(() => {
    const options = {
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent

        setDownloadInfo({
          progress: Math.floor((loaded * 100) / total),
          loaded,
          total,
          completed: false,
        })
      },
    }

    axios
      .get(fileDocument, {
        responseType: 'blob',
        ...options,
      })
      .then(function (response) {
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers['content-type'],
          })
        )

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', documentName)
        document.body.appendChild(link)
        link.click()

        setDownloadInfo((info) => ({
          ...info,
          completed: true,
        }))

        setTimeout(() => {
          removeFile()
        }, 4000)
      })
  }, [documentName, fileDocument, removeFile])

  const formatBytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`

  return (
    <ListItem>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          style={{ width: '100%' }}
        >
          <Grid item>
            <Typography variant="body1">{documentName}</Typography>
          </Grid>
          <Grid item>
            <small>
              {downloadInfo.loaded > 0 && (
                <>
                  <span>{formatBytes(downloadInfo.loaded)}</span>/{' '}
                  {formatBytes(downloadInfo.total)}
                </>
              )}

              {downloadInfo.loaded === 0 && <>Đang khởi tạo...</>}
            </small>
          </Grid>
          <Grid item>
            {downloadInfo.completed && (
              <span>
                Completed <CheckCircleIcon color="primary" />
              </span>
            )}
          </Grid>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <LinearProgressWithLabel value={downloadInfo.progress} />
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default DownloadItem
