const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns equal value to the custom key", () => {
    const event = {
      partitionKey: "customPartitionKey",
    };

    const result = deterministicPartitionKey(event);
    expect(result).toEqual("customPartitionKey");
  });

  it("Returns hash results from JSON stringified event", () => {
    const event = {
      property1: "value1",
      property2: "value2",
    };
    const result = deterministicPartitionKey(event);
    expect(result).toMatch(/^[0-9a-f]{128}$/i);
  });

  it("Returns from JSON stringified event", () => {
    const event = {
      property1: {
        nestedProperty: "value",
      },
    };
    const result = deterministicPartitionKey(event);
    expect(result).toMatch(/^[0-9a-f]{128}$/i);
  });

  it("Returns hash results with long key", () => {
    const event = {
      partitionKey: "Loooooooooooooong".repeat(20),
    };

    const result = deterministicPartitionKey(event);
    expect(result).toMatch(/^[0-9a-f]{128}$/i);
  });

  it("Returns equal value to short key", () => {
    const event = {
      partitionKey: "shooort",
    };

    const result = deterministicPartitionKey(event);
    expect(result).toEqual("shooort");
  });
});
