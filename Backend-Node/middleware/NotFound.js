const NotFoundError = (req, res) => {
  res.status(400).send(`
<h1>Page Not Found<h1>
<p> The page you are looking for has not been found <p>
<a href='/dashboard'>Navigate Back to Dashboard<a>
`);
};

module.exports = NotFoundError;
