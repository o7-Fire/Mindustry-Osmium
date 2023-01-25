export default class CRC32 {
    private static table: number[] = [];

    static {
        for (let i = 0; i < 256; i++) {
            let r = i;
            // its possible to have more fun, but im lazy
            for (let j = 0; j < 8; j++) {
                if ((r & 1) != 0) {
                    r = (r >>> 1) ^ 0xEDB88320
                } else {
                    r >>>= 1;
                }
            }
            CRC32.table[i] = r;
        }
    }

    private value = -1;

    public update(buf: Buffer, offset = 0, length = buf.length) {
        for (let i = 0; i < length; i++) {
            this.value = CRC32.table[(this.value ^ buf[offset + i]) & 0xFF] ^ (this.value >>> 8);
        }
    }

    public getValue(): number {
        return ~this.value; //may break but works
    }

    public resetValue(): void {
        this.value = -1
    }

    // Now there remains one question
    // Why is this CRC32 in the arch, but it is not being used
}