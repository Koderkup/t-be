import { PartialType } from '@nestjs/swagger';
import SegmentCreateDto from './segment-create.dto';

class SegmentUpdateDto extends PartialType(SegmentCreateDto) {}

export default SegmentUpdateDto;
