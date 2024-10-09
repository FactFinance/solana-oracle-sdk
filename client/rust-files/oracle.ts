export type Oracle = {
  "version": "0.1.0",
  "name": "oracle",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feedid",
          "type": "u16"
        }
      ]
    },
    {
      "name": "getDatafeed",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [],
      "returns": {
        "defined": "(u32,u32,u8)"
      }
    },
    {
      "name": "setValue",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "u32"
        },
        {
          "name": "timestamp",
          "type": "u32"
        }
      ]
    },
    {
      "name": "setLicense",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "license",
          "type": "u8"
        }
      ]
    },
    {
      "name": "addSubscription",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "revokeSubscription",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "dataFeed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "u64"
          },
          {
            "name": "license",
            "type": "u8"
          },
          {
            "name": "timestamp",
            "type": "u32"
          },
          {
            "name": "confidence",
            "type": "u8"
          }

        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AccessDenied",
      "msg": "You dont have access!"
    },
    {
      "code": 6001,
      "name": "Subscribe",
      "msg": "Subscribe to this feed at https://fact.finance"
    }
  ]
};

export const IDL: Oracle = {
  "version": "0.1.0",
  "name": "oracle",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feedid",
          "type": "u16"
        }
      ]
    },
    {
      "name": "getDatafeed",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [],
      "returns": {
        "defined": "(u32,u32,u8)"
      }
    },
    {
      "name": "setValue",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "u32"
        },
        {
          "name": "timestamp",
          "type": "u32"
        }
      ]
    },
    {
      "name": "setLicense",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "license",
          "type": "u8"
        }
      ]
    },
    {
      "name": "addSubscription",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "revokeSubscription",
      "accounts": [
        {
          "name": "datafeed",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "dataFeed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "u64"
          },
          {
            "name": "license",
            "type": "u8"
          },
          {
            "name": "timestamp",
            "type": "u32"
          },
          {
            "name": "confidence",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AccessDenied",
      "msg": "You dont have access!"
    },
    {
      "code": 6001,
      "name": "Subscribe",
      "msg": "Subscribe to this feed at https://fact.finance"
    }
  ]
};
