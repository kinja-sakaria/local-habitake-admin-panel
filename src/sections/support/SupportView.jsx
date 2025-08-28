import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  InputAdornment,
} from '@mui/material';
import { SendIcon } from 'components/asstes';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Dummy conversation list
const conversations = [
  {
    id: 1,
    name: 'Hope Haven',
    message: "Hi, How are you? What's ......",
    time: '1h ago',
    avatar: '/assets/images/users/avatar-6.png',
  },
  {
    id: 2,
    name: 'Hope Haven',
    message: "Hi, How are you? What's ......",
    time: '1h ago',
    avatar: '/assets/images/users/avatar-5.png',
  },
  {
    id: 3,
    name: 'Hope Haven',
    message: "Hi, How are you? What's ......",
    time: '1h ago',
    avatar: '/assets/images/users/avatar-4.png',
  },
  {
    id: 4,
    name: 'Hope Haven',
    message: "Hi, How are you? What's ......",
    time: '1h ago',
    avatar: '/assets/images/users/avatar-3.png',
  },
  {
    id: 5,
    name: 'Hope Haven',
    message: "Hi, How are you? What's ......",
    time: '1h ago',
    avatar: '/assets/images/users/avatar-2.png',
  },
  {
    id: 6,
    name: 'Hope Haven',
    message: "Hi, How are you? What's ......",
    time: '1h ago',
    avatar: '/assets/images/users/avatar-1.png',
  },
  {
    id: 7,
    name: 'Hope Haven',
    message: "Hi, How are you? What's ......",
    time: '1h ago',
    avatar: 'https://i.pravatar.cc/50?img=3',
  },
  {
    id: 8,
    name: 'Hope Haven',
    message: "Hi, How are you? What's ......",
    time: '1h ago',
    avatar: 'https://i.pravatar.cc/50?img=3',
  },
];

// Dummy messages
const initialMessages = [
  {
    id: 1,
    sender: 'user',
    text: 'HelloHelloHelloHelloHelloHelloHelloHelloHello',
    time: '1:29 PM',
    avatar: '/assets/images/users/avatar-2.png',
  },
  { id: 2, sender: 'admin', text: 'Hello sir, How may I assist you?', time: '1:30 PM' },
];

export default function SupportView() {
  const messagesEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { id: messages.length + 1, sender: 'admin', text: newMessage, time: 'Now', avatar: '/assets/images/users/avatar-2.png' },
    ]);
    setNewMessage('');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'admin',
          text: `📄 ${file.name}`,
          time: 'Now',
          avatar: '/assets/images/users/avatar-2.png',
        },
      ]);
    }
  };

  // 👇 Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: '100%', md: 395 },
          borderRight: { md: '1px solid #E8EBEE', xs: 'none' },
          display: { xs: showSidebar ? 'flex' : 'none', md: 'flex' },
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <Typography variant="h3" fontWeight={500} sx={{ p: 2, fontSize: { xs: '18px', md: '22px' } }}>
          Support
        </Typography>
        <Box py={2} marginX={{ xs: '16px', md: '28px' }}>
          <TextField
            fullWidth
            placeholder="Search"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: 3 },
            }}
          />
        </Box>
        <List sx={{ flex: 1, overflowY: 'auto' }}>
          <Box sx={{ marginX: { xs: '16px', md: '28px' } }}>
            {conversations.map((conv) => (
              <ListItem
                button
                key={conv.id}
                alignItems="flex-start"
                sx={{ ':hover': { bgcolor: 'rgba(236, 245, 255, 0.4)' } }}
                onClick={() => setShowSidebar(false)} // 👈 go to chat on mobile
              >
                <ListItemAvatar>
                  <Avatar src={conv.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography fontSize="16.43px" fontWeight={600}>
                      {conv.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" fontWeight={500} color="#565F68" noWrap>
                      {conv.message}
                    </Typography>
                  }
                />
                <Typography fontSize="10px" fontWeight={400} sx={{ whiteSpace: 'nowrap', ml: 1 }}>
                  {conv.time}
                </Typography>
              </ListItem>
            ))}
          </Box>
        </List>
      </Box>

      {/* Chat Window */}
      <Box
        sx={{
          flex: 1,
          display: { xs: showSidebar ? 'none' : 'flex', md: 'flex' },
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #E8EBEE',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* 👇 Back button only on mobile */}
          <IconButton onClick={() => setShowSidebar(true)} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar src="https://i.pravatar.cc/50?img=5" sx={{ mr: 2, width: 48, height: 48 }} />
          <Box>
            <Typography fontSize="16.43px" fontWeight={600} color="#565F68">
              Keefe
            </Typography>
            <Typography variant="caption" color="#565F68">
              Active 1:20
            </Typography>
          </Box>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 1, md: 2 },
            overflowY: 'auto',
            bgcolor: '#F8F9FA',
          }}
        >
          <Stack spacing={2}>
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.sender === 'user' && (
                  <Avatar
                    src={msg.avatar}
                    sx={{
                      mr: 1,
                      width: 35,
                      height: 35,
                      alignSelf: 'flex-start',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  />
                )}
                <Box sx={{ maxWidth: { xs: '80%', md: '60%' } }}>
                  <Box
                    sx={{
                      bgcolor: msg.sender === 'admin' ? 'success.main' : 'white',
                      color: msg.sender === 'admin' ? 'white' : '#00243F',
                      p: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                      {msg.text}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography variant="caption" sx={{ mt: 0.3, opacity: 0.7 }}>
                      {msg.time}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
        </Box>

        {/* Input */}
        <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex' }}>
          <input accept="*" id="file-upload" type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
          <label htmlFor="file-upload">
            <IconButton component="span">
              <AttachFileIcon sx={{ transform: 'rotate(29deg)' }} />
            </IconButton>
          </label>
          <TextField
            fullWidth
            size="small"
            placeholder="Write something..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
              },
              '& .MuiOutlinedInput-root.Mui-focused': { boxShadow: 'none' },
              '& .MuiInputBase-input': { fontSize: '16.43px' },
            }}
          />
          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
