import admin from 'firebase-admin';
import configs from '../configs.js';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'app-chat-real',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDdMaYkKLpGnR9p\nD2hF5z80H0aFkUQ0vIlEGWnboCeNPTw8EjkAD2EtyumDnlE/UAGWarbL4R7TVtMV\n/hZ36SqrJ/OwEsPd9rDL8fw+aO3xGa8o8lAdR57mBMD/tAxjG45DohR6JTuXjbbL\nsLKfkcX6o/nCXU26EQD3gvAMbGDpF6nuZfqLzLE0ba93HayF+AXbd7CIgHivZbFW\nYAOPb+TDlujrJS3YHvU/NfpJtL2VkzplwYV+YvaTAZ/yl9JkpuFddVg7ru/9jrmM\nSY4Uz0XmCNj7fguQomOkSWaOc+avWAimSzzb4WqDTRIMxGn0/msD7HE52M9vgLIR\n1bGyiPTbAgMBAAECggEAWlN8h5aUHuLp4UK375fTsQq2hzO/mROGsGb6WgQIMr6X\nWuaMHVCqfAM5IZTkk8itpUmVtSMMrfvuPjRg4321fWhWtIetMXacUuRSAABkbkjx\nRPTSr2pAYqj9UU4qoswtZ8QHvat3rtdhlsNk5hGmucf9ZZgpdfqcnPZ85W3ak0Ri\ndPCvLIqtH56WrJTEZBDeBzPMlO8f1pnTxi0D/fCpFn8xY5gaz3o0jiX3uaK3dKDL\n5yffhlX2PpuD0Yv0pr/Ynfd1HTGgMpm+ILrykq7fc3/CQEV2Bcv0oAoMVAMYqtcc\n3JRFXUXj9cHSNmh53pL0Rp1DzIZVouKkI1pSt6BesQKBgQD6rwg24sXhJK4iliVS\nOInxMQUbNAGEwP+M/S1uwKee+qwL4cXM8TxF4pfh7eFnTKVX6Ny8qRAIJiaHVLNS\ncGnzJkROt3K0+eCt9E4MpYssNNQM7c9bng71VDQHz5eRFbUQDkIbYmTq93Act4mR\n4FmNcF03Rq7HCG/cR7M/zKyxMQKBgQDh4oQlMG8pnK+lB8YNW7HVSIfecBmvDAqR\nEj8f/1/NJrhUTsCJl+DJMfWd9fT88EvqHLQ0KZGK2K6N9mQfWohmWOZsrpIHyc26\nruCF2kqgq06ZE/SUm0aDtNYm9BbdXZrX2BmkPbGm9I5hviOXl/BL9BcwLQGY7qpW\n2CEiPZrjywKBgQCiXdwkMJ2aRffDzxw9NQGjhuyXwgd5xMfAuftDUOVAw3vL9l/3\nbghr+2gEnd7w2WP+nITcbWRE4vDxlprPOqBlLNPxaECTl4U/Jo2nA1IxP8ZY2W8F\nGEr3+6H3rS2uezDbRWDr+78BsWKcNwSTx4w5YB4AP3fU0lIhiw8+s4LnAQKBgCXF\nqhFJ8xzDPb/b9+td7PPcaBPzLOhPnCi8I2AnZQ66LdKzRJD9m7IpL4hVi70MNbWV\nTTD3zoWoTDAjBoUTr4Fl1kpQOs0gms1f1t2rLhWF7+O7KYf8GyOFBtaGtJgZwf3b\n/hWv11gyxuhjUjJUTvN0grgknoLDTiqtg4TlRlRXAoGAbGrAfTG7gQ5sCQ9WkfvX\nT8BDEZI0H511Onz8YCQ0l605mpswzVlXqnPuoajDnOEW8ac5VPywSPP18Tv44MTX\nPcmBm53FCt/YswGny07u/RDpfDsPW0Mb/SFZwTVR/ZuVCEQXWuw1S4iAek2onSMX\nOriMr2D+IsQLoTO6vCsbYas=\n-----END PRIVATE KEY-----\n',
    clientEmail:
      'firebase-adminsdk-yip9c@app-chat-real.iam.gserviceaccount.com',
  }),
});

/**
 * Verify a Firebase ID token and decode
 * @param {string} token - Firebase Auth token
 * @returns decoded token if valid, otherwise returns null
 */
async function verifyToken(token) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch {
    return null;
  }
}

async function verifyTokenWithPhone(phone, token) {
  const decodeData = await verifyToken(token);
  if (!decodeData) {
    return false;
  }

  if (decodeData.exp < Date.now() / 1000) {
    return false;
  }

  const phoneNumber = decodeData.phone_number.replace('+84', '0');
  return phoneNumber === phone;
}

export default {
  verifyToken,
  verifyTokenWithPhone
};