﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic.Domain
{
    public interface IEntity
    {
        public int Id { get; set; }
    }

    public interface IEntity<T> 
    {
        public T Id { get; set; }
    }
}
