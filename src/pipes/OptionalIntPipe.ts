import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class OptionalIntPipe
  implements PipeTransform<string, number | undefined>
{
  transform(value: string, metadata: ArgumentMetadata): number | undefined {
    if (value === undefined) return undefined;

    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new BadRequestException(
        `${metadata.data} parameter must be a number.`,
      );
    }

    return val;
  }
}
