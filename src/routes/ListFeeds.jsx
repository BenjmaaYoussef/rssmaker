import React, {useEffect, useMemo} from 'react'
import MaterialReactTable from 'material-react-table';
import "../App.css"

const ListFeeds = (props) => {
    const columns = useMemo(
        () => [
          {
            accessorKey: 'created', //access nested data with dot notation
            header: 'Created at',
          },
          {
            accessorKey: 'url' || "readyLink",
            header: 'Feed source',
          },
          {
            accessorKey: 'id', //normal accessorKey
            header: 'Feed Link',
          }
        ],
        [],
      );
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
<ul class="responsive-table">
    <li class="table-header bg-gray-100">
      <div class="col col-1">Created at:</div>
      <div class="col col-2">Feed source:</div>
      <div class="col col-3">Feed link:</div>
    </li>
    {props.list.map(el => {
            if (el.readyLink) {
                return <li class="table-row">
                            <div class="col col-1" data-label="Job Id">{new Date(el.created).toLocaleString()}</div>
                            <div class="col col-2" data-label="Customer Name">{el.readyLink}</div>
                            <div class="col col-3" data-label="Amount"><a href={"https://us-central1-rssfeeder-2f1c0.cloudfunctions.net/scrape/feed/" + el.id}>{"https://us-central1-rssfeeder-2f1c0.cloudfunctions.net/scrape/feed/" + el.id}</a></div>
                        </li>
            } else {
                return <li class="table-row">
                <div class="col col-1" data-label="Job Id">{new Date(el.created).toLocaleString()}</div>
                <div class="col col-2" data-label="Customer Name">{el.url}</div>
                <div class="col col-3" data-label="Amount"><a href={"https://us-central1-rssfeeder-2f1c0.cloudfunctions.net/scrape/feed/" + el.id}>{"https://us-central1-rssfeeder-2f1c0.cloudfunctions.net/scrape/feed/" + el.id}</a></div>
            </li>
            }
        })}
    
  </ul>
    </div>
  )
}

export default ListFeeds