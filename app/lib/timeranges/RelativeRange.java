/*
 * Copyright 2013 TORCH UG
 *
 * This file is part of Graylog2.
 *
 * Graylog2 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Graylog2 is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Graylog2.  If not, see <http://www.gnu.org/licenses/>.
 */
package lib.timeranges;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Lennart Koopmann <lennart@torch.sh>
 */
public class RelativeRange extends TimeRange {

    private final int range;

    public RelativeRange(int range) throws InvalidRangeParametersException {
        if (range < 0) {
            throw new InvalidRangeParametersException();
        }

        this.range = range;
    }

    public Type getType() {
        return Type.RELATIVE;
    }

    @Override
    public Map<String, String> getQueryParams() {
        return new HashMap<String, String>() {{
            put("range", String.valueOf(range));
        }};
    }

}
