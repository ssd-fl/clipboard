const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  // const TRIVIAL_PARTITION_KEY = "0";
  // const MAX_PARTITION_KEY_LENGTH = 256;
  // let candidate;
  // if (event) {
  //   if (event.partitionKey) {
  //     candidate = event.partitionKey;
  //   } else {
  //     const data = JSON.stringify(event);
  //     candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  //   }
  // }
  // if (candidate) {
  //   if (typeof candidate !== "string") {
  //     candidate = JSON.stringify(candidate);
  //   }
  // } else {
  //   candidate = TRIVIAL_PARTITION_KEY;
  // }
  // if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
  //   candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  // }
  // return candidate;

  // Refactored code
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) return TRIVIAL_PARTITION_KEY;

  let candidate =
    event.partitionKey ||
    crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  candidate =
    candidate.length > MAX_PARTITION_KEY_LENGTH
      ? crypto.createHash("sha3-512").update(candidate).digest("hex")
      : candidate;

  return candidate;
};
