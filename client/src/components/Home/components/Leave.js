import { Card, CardContent, CardHeader, Grid, IconButton, ListItem, Menu, MenuItem, Stack } from '@mui/material'
import React from 'react'

const Leave = () => {
    const leave = [
        { id:1,LeaveType: "Annual Leave", LeaveBalance: "10 days" },
        { id:2,LeaveType: "Sick Leave", LeaveBalance: "5 days" },
      ];

  return (
    <>
      <Grid item xs={12} md={4} sm={6}>
              <Card variant="outlined">
                <CardHeader
                  sx={{ backgroundColor: "primary.main", color: "white", p: 1 }}
                  title={"Leave"}
                />
                <CardContent>
                    <Stack>
                        {leave.map((item)=>(

                       <ListItem key={item.id}  secondaryAction={
                        <IconButton aria-label="comment">
                          {item.LeaveBalance}
                        </IconButton>
                      }>{item.LeaveType}</ListItem>
                        ))}
                    </Stack>
                </CardContent>
              </Card>
            </Grid>
    </>
  )
}

export default Leave
