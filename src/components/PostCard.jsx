import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

function PostCard({ post }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {post.id}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ color: "inherit", mb: 1.5 }}
        >
          {post.title}
        </Typography>
        <Typography sx={{ color: "text.info", mb: 1.5 }}>
          {post.description}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>{post.author}</Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;
