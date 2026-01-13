import { Card, CardContent, Typography } from "@mui/material";

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
          {post.body}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          Author id:{post.userId}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;
