
// get channels for chatroom_id
// returns arr of channels
export const getChannels = (chatroom_id) =>{
  return $.ajax({
    method: 'get',
    url: '/api/chatrooms/'+ chatroom_id +'/channels',
  });
}


// create channel w/ chatroom id
// return single channel object
export const createChannel = (channel) =>{
  return $.ajax({
      method: 'post',
      url: '/api/channels',
      data: { channel: channel }
    });//end ajax
}


// update channel, w/ channel_id
// return single channel object
export const updateChannel = (channel) =>{
  return $.ajax({
      method: 'patch',
      url: '/api/channels/' + channel.id,
      data: { channel: channel }
    });// end ajax
}
