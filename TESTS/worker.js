self.onmessage = (event) => {
  let result;
  const limit = event.data;
  for (result = 0; result < limit; result++) {}
  self.postMessage(result);
  self.close();
};
