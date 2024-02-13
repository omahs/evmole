import { Vm } from 'evmole/evm/vm'
import { Element } from 'evmole/evm/element'
import { Op } from 'evmole/evm/opcodes'

class MyVm extends Vm {
  constructor(code, calldata) {
    super(code, calldata);
  }

  exec_opcode(op) {
    if (op == Op.JUMPDEST) {
      console.log('hooked JUMPDEST', this.memory);
      return [1];
    }
    return super.exec_opcode(op);
  }
}


const code = '608060405260043610610033575f3560e01c8063b69ef8a814610037578063d0e30db01461005d578063dd5d521114610067575b5f80fd5b348015610042575f80fd5b5061004b5f5481565b60405190815260200160405180910390f35b610065610086565b005b348015610072575f80fd5b506100656100813660046100bb565b61009d565b345f8082825461009691906100e5565b9091555050565b8063ffffffff165f808282546100b391906100e5565b909155505050565b5f602082840312156100cb575f80fd5b813563ffffffff811681146100de575f80fd5b9392505050565b8082018082111561010457634e487b7160e01b5f52601160045260245ffd5b9291505056'

const code_arr = Buffer.from(code, 'hex')
const cd_arr = Buffer.from('b69ef8a8', 'hex')

const vm = new MyVm(code_arr, new Element(cd_arr, 'calldata'))

while (!vm.stopped) {
  const ret = vm.step()
  console.log('step gas:', ret[1]);
}
