function isEmpty(v) {
  return v === undefined || v === null;
}

export default function isHTTPS(req, xForwardedProto = true) {
  // Test using req.connection.encrypted
  const encrypted = isEmpty(req.connection.encrypted)
    ? null : req.connection.encrypted === true;
  if (encrypted) {
    return true;
  }

  // Test using req.protocol
  const httpsProtocol = isEmpty(req.protocol) ? null : req.protocol === 'https';
  if (httpsProtocol) {
    return true;
  }

  // Test using x-forwarded-proto header
  const httpsXforwarded = (!xForwardedProto
    || isEmpty(req.headers['x-forwarded-proto'])) ? null
    : req.headers['x-forwarded-proto'].includes('https');
  if (httpsXforwarded) {
    return true;
  }

  // If no detection method is available return null
  if (!encrypted && !httpsProtocol && !httpsXforwarded) {
    return null;
  }

  return false;
}
